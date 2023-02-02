import Image from 'next/image'

import styles from '../../styles/Pokemon.module.css'

import {useRouter} from 'next/router'

export const getStaticPaths = async() => {
  const maxPokemons = 150
  const api = 'http://pokeapi.co/api/v2/pokemon/'

  const res = await fetch(`${api}/?limit=${maxPokemons}`)
  const data = await res.json()

  // params

  const paths = data.results.map((pokemon: any, index: number) => {
    return {
        params: { pokemonId: (index + 1).toString() },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async(context: any) => {

    const id = context.params.pokemonId

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const data = await res.json()

    return {
        props: {pokemon: data},
    }
}

export default function Pokemon({pokemon}: any) {

    const router = useRouter()
    
    if (router.isFallback) {
      return <div>Carregando...</div>
    }

    return (
        <div className={styles.pokemon_container}>
          <h1 className={styles.title}>{pokemon.name}</h1>
          <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                width={200}
                height={200}
                alt={pokemon.name}
            />
            <div>
              <h3>Número:</h3>
              <p>#{pokemon.id}</p>
            </div>
              <h3 className={styles.types_container}>Tipo:</h3>
              <div>
                {pokemon.types.map((item: any, index: number) => (
                  <span key={index} className={`${styles.type} ${styles['type_'+ item.type.name]}`}>{item.type.name}</span>
                ))}
              </div>
              <div className={styles.data_container}>
                <div className={styles.data_heigth}>
                  <h4>Altura:</h4>
                  <p>{pokemon.height * 10} cm </p>
                </div>
                <div className={styles.data_weight}>
                  <h4>Peso:</h4>
                  <p>{pokemon.weight / 10} kg </p>
                </div>
              </div>
        </div>
    )
}