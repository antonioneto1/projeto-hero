import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';


export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const history = useHistory();
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);
    
  async function handleDeleteIncident(id){
    try{
     await api.delete(`incidents/${id}`,{ 
     header: {
       Authorization:ongId,
      }
     });
     setIncidents(incidents.filter(incidents => incidents.id !== id));
    }catch(err){
      alert('não foi possivel excluir');
    }
  }
  function handleDeleteLogout(){
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt='Be The Hero'></img>
        <span>Bem vindo, {ongName}</span>
        <Link className='button' to='/incidents/new'>
          Cadastrar novo Caso
          </Link>
        <button type='button' onClick={handleDeleteLogout}>
          <FiPower size={18} color='#e02041' />
        </button>

      </header>
        <h1> casos cadastrados</h1>
        <ul>
          {incidents.map(incidents => (
            <li key={incidents.id}>
              <strong>Casos:</strong>
              <p>{incidents.title}</p>
              <strong>Descrição:</strong>
              <p>{incidents.description}</p>
              <strong>Valor:</strong>
          <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incidents.value)}</p>
              <button type='button' onClick={() => handleDeleteIncident(incidents.id)}>
                <FiTrash2 size={18} color='#a8a8b3' />
              </button>
            </li>
          ))}
        </ul>

    </div>
  );
}