const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    ...options
  })

  if (!response.ok) {
    throw new Error(
      `Erro na requisição (${response.status}): ${response.statusText}`
    )
  }

  return response.json()
}
