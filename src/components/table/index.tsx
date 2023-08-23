
import React, {useState} from 'react';
import { useUser } from '../../context/user-context';

import './style.scss';

interface DataItem {
  id: string;
  name: string;
  email: string;
  age: number
}

interface TableProps {
  data: DataItem[]; 
}

const Table : React.FC<TableProps> = ({data}) => {
  const {user} = useUser();

  const [sortKey, setSortKey] = useState<keyof DataItem | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
   // Function to toggle the sorting order when a header is clicked
   const toggleSort = (key: keyof DataItem) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

    // Function to sort the data
    const sortedData = [...data];
    if (sortKey) {
      sortedData.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) {
          return sortOrder === 'asc' ? -1 : 1;
        } else if (a[sortKey] > b[sortKey]) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

  return (
    <table className='table-container'>
      <thead>
        <tr>
          <th onClick={() => toggleSort('id')} >
              ID {sortKey === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => toggleSort('name')}>
            Name {sortKey === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => toggleSort('age')}>
            Age {sortKey === 'age' && (sortOrder === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => toggleSort('email')}>
            Email {sortKey === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
          </th>
          {user.role === "Editor" && (
            <>
              <th>Edit</th>
              <th>Delete</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.email}</td>
                {user.role === "Editor" && (
                  <>
                    <td><button className='dashing-btn small-btn primary-btn'>Edit</button></td>
                    <td><button className='dashing-btn small-btn red-btn'>Delete</button></td>
                  </>
              )}
              </tr>
            ))}
            {user.role === "Editor" && (
              <tr className='add-new-employee-btn'>
                  <td colSpan={6}>+ add new employee</td>
              </tr>
            )}
      </tbody>
    </table>
  );
}


export default Table;
