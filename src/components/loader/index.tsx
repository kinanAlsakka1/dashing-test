import {useEffect , useState} from 'react'
import { useUser } from '../../context/user-context';
import{isAuth} from '../../core/apis/authentication'

import './style.scss';

function Loader(props: { children: any; }) {
    const { children } = props
    const { updateUser , updateIsAuth } = useUser();
    const [loading , setLoading] = useState(true)
  
    const checkAuth = () => {
      setLoading(true)
      isAuth().then((result : any) => {
        if(result.success){
            updateIsAuth(true)
            updateUser(result.data)
        }
        else{
          updateIsAuth(false)
          updateUser({username: '',name: '',role : 'Viewer'})
        }
        setLoading(false)
      })
    }
  
    useEffect(() => {
      checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return loading ? (
        <div className='spinner-countainer'>
            loading
            <div className="spinner"></div>
        </div>
      ) : (
        <>{children}</>
      )
    }

export default Loader