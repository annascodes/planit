import React, { useEffect, useState } from 'react'
import AddDesignation from './Designations'
import useFetchAlone from '../hooks/useFetchAlone'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import useDeleteData from '../utilities/useDeleteData'

const Roles = () => {
    const [detailDesig, setdetailDesig] = useState(null)
    const [sure, setSure] = useState(null)
    const { fetchData: getDetailDesig, data, loading: deatilDesigLoading, err: detailDesigErr } = useFetchAlone()
    const [flag, setFlag] = useState(new Date())

    const { deletedata, data: deletedResponse, loading, err } = useDeleteData('/api/designation/deletedesignation')


    useEffect(() => {
        getDetailDesig('/api/designation/usersunderdesignations')
    }, [])

    useEffect(() => {
        getDetailDesig('/api/designation/usersunderdesignations')
    }, [flag, deletedResponse])

    useEffect(() => {
        if (data) {
            // console.log(data)
            setdetailDesig(data)
        }
    }, [data])

    const handleDeleteDesignation = (obj)=>{
        console.log(obj)
        deletedata(obj)
    }

    useEffect(()=>{
        if(deletedResponse){
            console.log(deletedResponse)
        }

    },[deletedResponse])
    console.log(sure)
    return (
        <div>
            <AddDesignation setFlag={setFlag} desigs={detailDesig} setDesigs={setdetailDesig} />

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Designation/Role</th>
                            <th>Available</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deatilDesigLoading ?
                                <tr>
                                    <td> <AiOutlineLoading3Quarters className='animate-spin' /> </td>
                                    <td> <AiOutlineLoading3Quarters className='animate-spin' /> </td>
                                    <td> <AiOutlineLoading3Quarters className='animate-spin' /> </td>
                                    <td> <AiOutlineLoading3Quarters className='animate-spin' /> </td>

                                </tr>

                                :
                                (

                                    detailDesig && detailDesig.map((d, di) => {
                                        return (
                                            <tr>
                                                <th>{++di}</th>
                                                <td>{d.title}</td>
                                                <td>
                                                    {
                                                        d.users.map((u, ui) => {
                                                            return (
                                                                <div className='my-2'>
                                                                    @{u.username}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td>

                                                    {
                                                        sure === d.title_id.toString() ?
                                                            <div>
                                                                <span>Are you sure?</span>
                                                                <div className='flex gap-1'>
                                                                    <button 
                                                                    onClick={()=>handleDeleteDesignation(
                                                                        {
                                                                            title_id:d.title_id,
                                                                            title: d.title
                                                                        }
                                                                    )}
                                                                    className='btn btn-xs btn-error tracking-widest text-white uppercase'>yes</button>
                                                                    <button 
                                                                    onClick={()=>setSure(null)}
                                                                    className='btn btn-xs btn-primary tracking-widest text-white uppercase'>no</button>
                                                                </div>
                                                            </div>
                                                            :
                                                            <button onClick={() => setSure(d.title_id.toString())} >
                                                                delete it
                                                            </button>
                                                    }

                                                </td>
                                            </tr>
                                        )
                                    })

                                )
                        }



                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Roles
