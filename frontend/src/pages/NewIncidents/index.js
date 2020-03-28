import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';



export default function NewIncidents() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  async function handleNew(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };
    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })
      history.push('/profile');
    } catch (err) {
      alert('erro ao cadastrar um caso, tente novamente');
    }

  }



  return (
    <div className='new-Incidents'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be The Hero'></img>
          <form onSubmit={handleNew}>
            <h1>Cadastro Novo caso</h1>
            <p>Utilize os espaços para cadastrar um novo caso.</p>
            <Link className='back-link' to='/profile'>
              <FiArrowLeft size={16} color='#e02041' />
          Voltar para Home
        </Link>
          </form>
        </section>
        <form>
          <input placeholder='Titulo do Caso'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />


          <textarea placeholder='Descrição'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />


          <input placeholder='Valor em Reais' value={value}
            onChange={e => setValue(e.target.value)}
          />


          <button className='button' type='submit'>Enviar</button>
        </form>
      </div>
    </div>
  );
}