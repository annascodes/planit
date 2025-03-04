import { useState } from "react"

const useFetchAlone = ()=>{
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false) 
    const [err, setErr] = useState(null)

    const fetchData =async(url)=>{
        try {
            setLoading(true)
            const res = await fetch(url)
            const responseData = await res.json()
            if(!res.ok){
                console.log(responseData.message)
                setData(null)
                setLoading(false)
                setErr(responseData.message)
            }else{
                setData(responseData)
                setLoading(false)
                setErr(null)
            }
            
        } catch (error) {
            console.log(error)
            setData(null)
            setLoading(false)
            setErr(null)
        }
    }

    return {fetchData, data, loading, err}
}

export default useFetchAlone;