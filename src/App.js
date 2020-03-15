import React, {useEffect, useState} from 'react';
import './App.css';
import UsersList from "./components/UsersList";
import lodash from 'lodash'

function App() {
    const [state, setState] = useState('')
    const [loading, setLoading] = useState(true)
    const [sort, setSort] = useState('asc')
    const [sortField, setSortField] = useState('id')
    const [item, setItem] = useState(null)


    useEffect(() => {
        setLoading(true)
        fetch('http://www.filltext.com/?rows=32&id={number|1000}&firstName=\n' +
            '{firstName}&lastName={lastName}&email={email}&phone=(phone | (xx) 00-xx-»x) &address={addressObject}&description=\n' +
            '{lorem|100}').then(response => response.json()).then(data => {
                setTimeout(() => {
                    setState(data)
                    setLoading(false)
                    const orderData = lodash.orderBy(data, 'id', 'asc')
                    setState(orderData)
                }, 3000)


        })
    }, [])

    const onSort = sortField => {
        const clonedState = state.concat()
        const sortType = sort === 'asc' ? 'desc' : 'asc'
        const orderData = lodash.orderBy(clonedState, sortField, sortType)
        setState(orderData)
        setSort(sortType)
        setSortField(sortField)

    }

    const onRowSelect = item => {
        console.log(item)
       setItem(item)
    }


    return (
        <div className="pt-3">
            <div className="container">
                <div className="card text-white bg-dark mb-3">
                    <div className="card-header"><strong>Информация о приложении</strong></div>
                    <div className="card-body">
                        <p className="card-text"><strong>1. Данные тянутся с API <br/>
                            2. При клике на заголовок колонки - происходит сортировка <br/>
                            3. При клике на строку - появляется карточка с развернутой информацией о пользователе
                        </strong></p>
                    </div>
                </div>

                {item === null ? null :  <div className="card text-white bg-dark mb-3">
                    <div className="card-header"><strong>Информация о пользователе</strong></div>
                    <div className="card-body">
                        <h5 className="card-title"><strong>id:</strong> {item.id}</h5>
                        <p className="card-text"><strong>Имя:</strong> {item.firstName}</p>
                        <p className="card-text"><strong>Фамилия:</strong> {item.lastName}</p>
                        <p className="card-text"><strong>Email:</strong> {item.email}</p>
                        <p className="card-text"><strong>Телефон:</strong> {item.phone}</p>
                        <p className="card-text"><strong>Описание: </strong>{item.description}</p>
                    </div>
                </div>}

                <table className="table table-striped table-dark">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th onClick={onSort.bind(null, 'id')}>ID {sortField === 'id' ? <small>{sort === 'asc' ? '↑' : '↓'}</small> : null}</th>
                        <th onClick={onSort.bind(null, 'firstName')}>Имя {sortField === 'firstName' ? <small>{sort === 'asc' ? '↑' : '↓'}</small> : null}</th>
                        <th onClick={onSort.bind(null, 'lastName')}>Фамилия {sortField === 'lastName' ? <small>{sort === 'asc' ? '↑' : '↓'}</small> : null}</th>
                        <th onClick={onSort.bind(null, 'email')}>Email {sortField === 'email' ? <small>{sort === 'asc' ? '↑' : '↓'}</small> : null}</th>
                    </tr>
                    </thead>
                    <tbody>

                    {loading ? <tr className="text-center d-block pt-2 pb-2">
                        <th className="border-0">Загружаю... </th>
                    </tr> : <UsersList state={state} onRowSelect={onRowSelect}/>}

                    </tbody>
                </table>



            </div>
        </div>
    );
}

export default App;
