export async function databaseResponse(func): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await func());
    } catch (error) {
      reject({ code: error.code, message: error.detail });
    }
  });
}
