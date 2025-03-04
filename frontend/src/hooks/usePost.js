import { useState } from "react"


const usePost = ()=>{
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [err, setErr] = useState(null)

    const post = async({formData, url})=>{
        try {
            setLoading(true)
            const res = await fetch(url,
                {
                    method: 'post',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(formData)
                }
            )
            const responseData = await res.json();
            if(!res.ok){
                console.log(responseData.message)
                setErr(responseData.message)
                setLoading(false)
                setData(null)
            }else{
                setData(responseData)
                setLoading(false)
                setErr(null)
            }
            
        } catch (error) {
            console.log(error)
            setData()
        }
    }

    return {post, data, loading, err};
}

export default usePost;