import axios from "axios";
export default{
    products:async (product)=>{
        return await axios.create(
            `${process.env.REACT_APP_SERVER_HOST_API}/products`,
            product,
        )
        .then(res=>res)
        .catch(err=>err)
    },
    create :async (formData)=>{
        return await axios.post(
            `${process.env.REACT_APP_SERVER_HOST_API}/products`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
    },
    findMany: async () => {
        return await axios.get(
          `${process.env.REACT_APP_SERVER_HOST_API}/products`
        )
      },
      
      findById: async (id) => {
        return await axios.get(
          `${process.env.REACT_APP_SERVER_HOST_API}/products/ ` + id
        )
      },
    findByCategoryId: async(category_id)=>{
        return await axios.get(
            `${process.env.REACT_APP_SERVER_HOST_API}/products/${category_id}`
        )
      },
      search: async (searchKey) => {
        return await axios.get(`${process.env.REACT_APP_SERVER_HOST_API}/products?search=${searchKey}`)
    },
    delete: async (product_id) => {
      return await axios.delete(`${process.env.REACT_APP_SERVER_HOST_API}/products/${product_id}`)
  },
  edit: async (id, updatedData) => {
    try {
        const result = await axios.patch(
            `${process.env.REACT_APP_SERVER_HOST_API}/products/${id}`,
            updatedData
        );
        return result.data; 
    } catch (error) {
        throw error;
    }
}

  }

