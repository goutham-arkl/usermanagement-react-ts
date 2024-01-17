import React, { useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useAppSelector } from '../redux/hooks';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"

type User = {
  idNumber: number;
  idType: string;
  mobile: number;
  sex: string;
  age: number;
  name: string;
  pincode: number;
  address: string;
  country: string;
  state: string;
  city: string;
};

const Home = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
      };
  const users = useAppSelector((state) => state.user.user.users);
  console.log(users);

  const columns: TableColumn<User>[] = [
    {
        name: 'Name',
        selector:row=>row.name,
        sortable: true,
      },
      {
        name: 'Sex',
        selector:row=>row.sex,
        sortable: true,
      },
      {
        name: 'Age',
        selector:row=>row.age,
        sortable: true,
      },
      {
        name: 'Pincode',
        selector:row=>row.pincode,
        sortable: true,
      },
      {
        name: 'Address',
        selector:row=>row.address,
        sortable: true,
      },
      {
        name: 'Country',
        selector:row=>row.country,
        sortable: true,
      },
      {
        name: 'State',
        selector:row=>row.state,
        sortable: true,
      },
      {
        name: 'City',
        selector:row=>row.city,
        sortable: true,
      },
    {
      name: 'ID Number',
      selector:row=>row.idNumber,
      sortable: true,
    },
    {
      name: 'ID Type',
      selector:row=>row.idType,
      sortable: true,
    },
    {
      name: 'Mobile',
      selector:row=>row.mobile,
      sortable: true,
    },
   
    
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);



  return (
    <motion.div className='App' 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
    >
      
      <div className='container'>
      <div className='header'>
        <h1>Users</h1>
        <Link to='/adduser' className='add'>Add User</Link>
      </div>
       <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 20]}
        selectableRows
        highlightOnHover
        subHeader
        responsive={true}
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search here"
            onChange={(e) => handleSearch(e.target.value)}
          />
        }
        persistTableHead
        pointerOnHover
      />
      </div>

    </motion.div>
  );
};

export default Home;
