import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

const stats = [['250+', 'Doctors'], ['50K+', 'Patients served'], ['18', 'Departments'], ['120K+', 'Appointments'], ['98.4%', 'Success rate']]

function Count({ value }) { const ref = useRef(null); const inView = useInView(ref, { once: true }); const numeric = Number(value.replace(/[^0-9.]/g, '')); const suffix = value.replace(/[0-9.]/g, ''); const count = useMotionValue(0); const rounded = useTransform(count, (latest) => `${numeric % 1 ? latest.toFixed(1) : Math.round(latest)}${suffix}`); useEffect(() => { if (inView) animate(count, numeric, { duration: 1.7, ease: 'easeOut' }); }, [count, inView, numeric]); return <motion.strong ref={ref}>{rounded}</motion.strong> }
function Statistics() { return <section className="stats-section"><div className="shell stats-grid">{stats.map(([value, label]) => <div key={label}><Count value={value} /><span>{label}</span></div>)}</div></section> }
export default Statistics
