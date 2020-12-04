import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import api from 'services'

const useFile = () => {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [data, setData] = useState(null)

  const sendFile = useCallback(
    async (captcha) => {
      setLoading(true)
      try {
        if (!file) throw new Error('Select a file')

        const formData = new FormData()

        formData.append('file', file[0])
        formData.append('fields', captcha)

        const response = await api.post('/file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        toast.dark('Link generated :P')
        setData(response.data)
        setLoading(false)
      } catch (e) {
        toast.error(e.response.data.message)
        setLoading(false)
      }
    },
    [file]
  )

  return { file, setFile, sendFile, loading, data, setData }
}

export default useFile
