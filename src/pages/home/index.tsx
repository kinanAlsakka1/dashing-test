
import React, { useState , useEffect } from 'react';

import { useUser } from '../../context/user-context';
import * as authApis from '../../core/apis/authentication';
import * as employeesApis from '../../core/apis/employees';

import Table from '../../components/table'

import './style.scss';

const Home : React.FC = () => {
  const { updateUser , updateIsAuth } = useUser();

  const [data , setData] = useState<any[]>([])
  const [filterResult , setFilterResult] = useState<any[]>([])
  const [search , setSearch] = useState('')
  const [loading , setLoading] = useState(false)

  // handle logout click
  const logout = () => {
    setLoading(true)
    authApis.logOut().then((result : any) => {
        if(result){
            setLoading(false)
            updateIsAuth(false)
            updateUser({username: '',name: '',role : 'Viewer'})
        }
    }).catch((err)=>{
      console.log(err)
        setLoading(false)
    })
  }

  // get table data form DB
  const getData = () => {
    employeesApis.get().then((result : any) => {
      if(result.success){
        setData(result.data)
        setFilterResult(result.data)
      }
    })
  }

  // Filtering table list by using the search text
  const filterList = (value : string) => {
    setSearch(value)
    setFilterResult(data.filter(item => item?.name.toLowerCase().includes(value.toLowerCase())))
  }

  useEffect(()=>{
    getData()
  },[])
  
  return (
    <div className="home-page-container">
      <input type="text" className='search-box' value={search} placeholder="Type to search by name" 
      onChange={(e : any) => filterList(e.target.value)}/>
      <Table data={filterResult}/>
      <button type='button' className='dashing-btn normal-btn red-btn logout-btn' onClick={logout} disabled={loading}>
        logout
        {loading && (<div className="spinner"></div>)}
      </button>
    </div>
  );
}

export default Home;
