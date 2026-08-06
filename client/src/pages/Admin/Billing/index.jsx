import ResourcePage from '../../../components/tables/ResourcePage'

const columns = [
  { key: 'invoiceNumber', label: 'Invoice' },
  { key: 'patient', label: 'Patient', render: (item) => item.patient?.name },
  { key: 'total', label: 'Total', render: (item) => `₹${item.total || 0}` },
  { key: 'paidAmount', label: 'Paid', render: (item) => `₹${item.paidAmount || 0}` },
  { key: 'paymentStatus', label: 'Status', render: (item) => <span className="status-pill">{item.paymentStatus}</span> },
]
const fields = [{ key: 'patient', label: 'Patient ID', required: true }, { key: 'total', label: 'Total amount', type: 'number', required: true }, { key: 'paidAmount', label: 'Paid amount', type: 'number' }, { key: 'paymentStatus', label: 'Payment status', type: 'select', options: ['paid', 'partial', 'pending', 'overdue'] }, { key: 'paymentMethod', label: 'Payment method' }]

export default function Billing() { return <ResourcePage title="Billing & Invoices" subtitle="Create invoices, track payments and outstanding balances." endpoint="/admin/billing" columns={columns} fields={fields} filters={['paid', 'partial', 'pending', 'overdue']} filterKey="paymentStatus" /> }
