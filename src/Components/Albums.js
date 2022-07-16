import React, { useEffect, useState } from 'react'
import { apiGetAlbums } from '../Services/IndexService';

export default function Albums() {
    const [albumData, setAlbumData] = useState([]);

    useEffect(() => {
        apiGetAlbums().then((result) => {
            setAlbumData(result);
        })
            .catch((error) => {
                console.log(error)
            });
        return () => { }
    }, []);

    const handleFilterChange = (value) => {
        console.log(value)
        if (value) {
            const data = albumData.find(x => x.id === Number(value));
            if (data) {
                removeClass();
                const element = document.getElementById('album-' + data.id);
                element.classList.add('bg-warning');
                element.scrollIntoView();
            } else {
                removeClass();
            }
        }
        else {
            removeClass();
            const tbl = document.getElementById('dataTable');
            tbl.scrollTop = 0;
        }
    }

    const removeClass = () => {
        const ele = document.getElementsByClassName('bg-warning');
        if (ele.length) {
            ele[0].classList.remove("bg-warning");
        }
    }

    return (
        <div className='row col-10 offset-md-1 card my-5'>
            <div className='albums-filter row col-12 justify-content-center my-4'>
                <label className='label col-1'>search </label>
                <div className='col-3'>
                    <input type="number" className='form-control' placeholder='id' onChange={(e) => handleFilterChange(e.target.value || '')} />
                </div>
            </div>
            <div className='albums px-5' id='dataTable'>
                <table className='table' align='center' border={1}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>UserId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            albumData && albumData.map((item) => (
                                <tr id={"album-" + item.id} key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.userId}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
