export const convertToIdName = (data) => {
  return {
    id: data?.value || 0,
    name: data?.label || '',
  };
};
