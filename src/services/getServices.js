
export const getServices = async () => {
  const res = await fetch('http://localhost:3000/services/api/get-all');
  const services = res.json()
  return services;
};

export const getServicesDetails = async (id) => {
  const res = await fetch(`http://localhost:3000/services/api/${id}`)
  const service = res.json()
  return service;
}