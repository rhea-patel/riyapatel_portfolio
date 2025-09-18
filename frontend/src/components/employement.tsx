// import { useEffect, useState } from "react";
// import type { Employment } from "../types/types";
// import { fetchEmployment } from "../api";

// export default function EmploymentSection() {
//   const [employment, setEmployment] = useState<Employment[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchEmployment()
//       .then((data) => setEmployment(data))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading employment history...</p>;
//   }

//   return (
//     <div className="space-y-6">
//       <h2 className="text-3xl font-bold text-center mb-6">Experience</h2>
//       {employment.map((job, i) => (
//         <div
//           key={i}
//           className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
//         >
//           <h3 className="text-xl font-semibold text-gray-800">
//             {job.role} — {job.company}
//           </h3>
//           <p className="text-gray-600">
//             {job.location} | {job.duration}
//           </p>
//           <ul>{job.description.map((d, idx) => <li key={idx}>{d}</li>)}</ul>

//         </div>
//       ))}
//     </div>
//   );
// }
