import {
  fetchUtils,
  DataProvider,
  GetListParams,
  GetOneParams,
  GetManyParams,
  GetManyReferenceParams,
  CreateParams,
  UpdateParams,
  UpdateManyParams,
  DeleteParams,
  DeleteManyParams,
} from 'react-admin'

const apiUrl = '/api/admin'

const httpClient = fetchUtils.fetchJson

const convertFileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })

const dataProvider: DataProvider = {
  getList: async (resource: string, params: GetListParams) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify({ field, order }),
      range: JSON.stringify({ from: (page - 1) * perPage, to: page * perPage - 1 }),
      filter: JSON.stringify(params.filter),
    }

    const url = `${apiUrl}/${resource}?${new URLSearchParams(query).toString()}`
    const { json, headers } = await httpClient(url)

    return {
      data: json.data,
      total: parseInt(headers.get('content-range')?.split('/')?.[1] || '0', 10),
    }
  },

  getOne: async (resource: string, params: GetOneParams) => {
    const url = `${apiUrl}/${resource}/${params.id}`
    const { json } = await httpClient(url)

    return {
      data: json,
    }
  },

  getMany: async (resource: string, params: GetManyParams) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    const url = `${apiUrl}/${resource}?${new URLSearchParams(query).toString()}`
    const { json } = await httpClient(url)

    return {
      data: json,
    }
  },

  getManyReference: async (resource: string, params: GetManyReferenceParams) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify({ field, order }),
      range: JSON.stringify({ from: (page - 1) * perPage, to: page * perPage - 1 }),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    }

    const url = `${apiUrl}/${resource}?${new URLSearchParams(query).toString()}`
    const { json, headers } = await httpClient(url)

    return {
      data: json.data,
      total: parseInt(headers.get('content-range')?.split('/')?.[1] || '0', 10),
    }
  },

  update: async (resource: string, params: UpdateParams) => {
    let newData = params.data

    // Handle image uploads for products
    if (resource === 'products' && params.data.images) {
      if (Array.isArray(params.data.images)) {
        const images = await Promise.all(
          params.data.images.map(async (image: any) => {
            if (image.rawFile) {
              return await convertFileToBase64(image.rawFile)
            }
            return image
          })
        )
        newData = { ...params.data, images: JSON.stringify(images) }
      }
    }

    const url = `${apiUrl}/${resource}/${params.id}`
    const { json } = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(newData),
    })

    return {
      data: json,
    }
  },

  updateMany: async (resource: string, params: UpdateManyParams) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    const url = `${apiUrl}/${resource}?${new URLSearchParams(query).toString()}`
    const { json } = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    })

    return {
      data: json,
    }
  },

  create: async (resource: string, params: CreateParams) => {
    let newData = params.data

    // Handle image uploads for products
    if (resource === 'products' && params.data.images) {
      if (Array.isArray(params.data.images)) {
        const images = await Promise.all(
          params.data.images.map(async (image: any) => {
            if (image.rawFile) {
              return await convertFileToBase64(image.rawFile)
            }
            return image
          })
        )
        newData = { ...params.data, images: JSON.stringify(images) }
      }
    }

    const url = `${apiUrl}/${resource}`
    const { json } = await httpClient(url, {
      method: 'POST',
      body: JSON.stringify(newData),
    })

    return {
      data: { ...json, id: json.id },
    }
  },

  delete: async (resource: string, params: DeleteParams) => {
    const url = `${apiUrl}/${resource}/${params.id}`
    const { json } = await httpClient(url, {
      method: 'DELETE',
    })

    return {
      data: json,
    }
  },

  deleteMany: async (resource: string, params: DeleteManyParams) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    const url = `${apiUrl}/${resource}?${new URLSearchParams(query).toString()}`
    const { json } = await httpClient(url, {
      method: 'DELETE',
    })

    return {
      data: json,
    }
  },
}

export { dataProvider }