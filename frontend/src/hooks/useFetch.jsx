import { useState } from "react"


const useFetch = ()=>{

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)

    const fetchData = async(url, formData)=>{
        try {
            setLoading(true)
            const res = await fetch(url,
                {
                    method: 'post',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(formData)
                }
            )

            const responseData = await res.json()
            if(!res.ok){
                console.log(responseData.message)
                setLoading(false)
                setErr(responseData.message)
                setData(null)
            }else{
                console.log(responseData)
                setData(responseData)
                setLoading(false)
                setErr(null)
            }
            
        } catch (error) {
            console.log(error)
            setLoading(false)
            setErr(error.message)
            setData(null)

        }
    }

    return {fetchData, data, loading, err}

}

export default useFetch;