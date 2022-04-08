import {API_URL} from "../components/utils/consts"

export const createUser = async (body) => {
  return await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify(body)
  })
}

export const createMessage = async (body) => {
  return await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify(body)
  })
}
