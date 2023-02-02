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
    fallback: false,
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
    return (
        <p>{pokemon.name}</p>
    )
}