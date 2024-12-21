
export const StorageUser = () => {
    const userData = localStorage.getItem('token')
    if (userData) {
      const user = JSON.parse(userData)
      return user
    }else{
      console.log('User not found')
    }
}