const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const createResourceController = (Model, { searchFields = [], populate = '', defaultSort = '-createdAt', beforeCreate, beforeUpdate } = {}) => ({
  list: async (req, res, next) => {
    try {
      const page = Math.max(Number(req.query.page) || 1, 1); const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
      const filter = {};
      if (req.query.status) filter.status = req.query.status;
      if (req.query.category) filter.category = req.query.category;
      if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus;
      if (req.query.search && searchFields.length) filter.$or = searchFields.map((field) => ({ [field]: { $regex: escapeRegExp(req.query.search), $options: 'i' } }));
      const requestedSort = typeof req.query.sort === 'string' && /^-?[A-Za-z][A-Za-z0-9_.]*$/.test(req.query.sort) ? req.query.sort : defaultSort;
      const [items, total] = await Promise.all([Model.find(filter).populate(populate).sort(requestedSort).skip((page - 1) * limit).limit(limit).lean(), Model.countDocuments(filter)]);
      res.json({ success: true, data: items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
    } catch (error) { next(error); }
  },
  get: async (req, res, next) => { try { const item = await Model.findById(req.params.id).populate(populate); if (!item) return res.status(404).json({ success: false, message: 'Record not found.' }); return res.json({ success: true, data: item }); } catch (error) { return next(error); } },
  create: async (req, res, next) => { try { const payload = beforeCreate ? await beforeCreate(req.body, req) : req.body; const item = await Model.create(payload); return res.status(201).json({ success: true, data: item }); } catch (error) { return next(error); } },
  update: async (req, res, next) => { try { const payload = beforeUpdate ? await beforeUpdate(req.body, req) : req.body; const item = await Model.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true }).populate(populate); if (!item) return res.status(404).json({ success: false, message: 'Record not found.' }); return res.json({ success: true, data: item }); } catch (error) { return next(error); } },
  remove: async (req, res, next) => { try { const item = await Model.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ success: false, message: 'Record not found.' }); return res.json({ success: true, message: 'Record deleted successfully.' }); } catch (error) { return next(error); } },
});

module.exports = { createResourceController };
