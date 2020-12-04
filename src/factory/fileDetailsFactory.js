import { formatBytes } from 'utils'

const fileDetailsFactory = (file) => ({
  name: file[0]?.name?.split('.')[0],
  fullName: file[0]?.name,
  type: file[0]?.type?.split('/')[1],
  size: formatBytes(file[0]?.size),
})

export default fileDetailsFactory
