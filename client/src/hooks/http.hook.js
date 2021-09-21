import {useState, useCallback} from "react";

export const useHttp = ()=>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [okMessage, setMessage] = useState(null)

    const request = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setLoading(true)
            try{
                if(body){
                    body = JSON.stringify(body)
                    headers['Content-Type'] = 'application/json'
                }
                const response = await fetch(url, {method, body, headers})
                const data = await response.json()
                if(!response.ok){
                    throw new Error(data.message[0].msg || data.message || 'Что-то пошло не так')
                }
                setLoading(false)
                setMessage(data.message)
                return data
            }
            catch (e) {
                setLoading(false)
                setError(e.message)
                throw e.message
            }
        },
    []
    )

    const clearError = useCallback( ()=> {
        setError(null)
    }, [])
    return {loading, request, error, clearError, okMessage}
}