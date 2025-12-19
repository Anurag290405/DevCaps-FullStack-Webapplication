// Backend no longer serves home data; return empty placeholders
export default async function GetHomeData() {
  return { success: true, data: { homedata: [], stat: [] } };
}