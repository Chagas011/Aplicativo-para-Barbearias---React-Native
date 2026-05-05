export async function uploadToS3(
  uploadSignature: string,
  file: { uri: string; type: string; name: string },
) {
  // 1️⃣ Decodifica o base64 SEM Buffer
  const decoded = JSON.parse(atob(uploadSignature));

  const { url, fields } = decoded;

  // 2️⃣ Cria o FormData
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  // 3️⃣ Anexa o arquivo
  formData.append("file", {
    uri: file.uri,
    type: file.type,
    name: file.name,
  } as any);

  // 4️⃣ Envia para o S3
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    console.log("S3 ERROR:", text);
    throw new Error("Erro ao enviar arquivo para o S3");
  }
}
