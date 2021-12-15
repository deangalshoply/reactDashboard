import React from 'react'
import './Topbar.css'
import Button from '@mui/material/Button';
import TemporaryDrawer from '../Drawer/Drawer';
import { useNavigate  } from 'react-router-dom';

export default function Topbar() {

    let navigate = useNavigate();

    function handleClick(e) {
      e.preventDefault();
      navigate(e.target.name)
      
    }

   

    return (
        <div className="Topbar">
            <TemporaryDrawer />
            <Button variant="contained" name='/mbs' onClick={handleClick} sx={{ width: 150 , height:70, borderRadius:'20px' }}>מיי באנדלס</Button>
            <Button variant="contained" name='/hesed' onClick={handleClick} sx={{ width: 150 , height:70, borderRadius:'20px' }}>חסד</Button>
            {/* <Button variant="contained" name='/citysal' onClick={handleClick} sx={{ width: 150 , height:70, borderRadius:'20px' }}>סיטיסל</Button> */}

        </div>
    )
}


