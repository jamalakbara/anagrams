import { useEffect, useState } from "react"

const anagrams = (word) => {
    const wordArray = word.split('')
    const permutations = permute(wordArray)
    const anagrams = permutations.map(permutation => {
        return permutation.join('')
    })
    return anagrams
}

const permute = (wordArray) => {
    if (wordArray.length === 1) {
        return [wordArray]
    }
    const permutations = []
    for (let i = 0; i < wordArray.length; i++) {
        const letter = wordArray.splice(i, 1)[0]
        const subPermutations = permute(wordArray)
        for (let j = 0; j < subPermutations.length; j++) {
            const subPermutation = subPermutations[j]
            permutations.push([letter].concat(subPermutation))
        }
        wordArray.splice(i, 0, letter)
    }
    return permutations
}

const Home = () => {
    const [input, setInput] = useState('')
    const [result, setResult] = useState([])
    const handleChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }
    const handleClick = (e) => {
        e.preventDefault()
        const input_clear_white_space = input.replace(/\s/g, '')
        const input_array = input_clear_white_space.split(',')
        let res = []
        input_array.forEach(element => {
            res.push(anagrams(element))
        });
        setResult(res)
    }
  return (
      <div>
        <div>
            <input type='text' value={input} onChange={handleChange} />
            <button onClick={handleClick}>Input</button>
        </div>
        <div>
            <p>{JSON.stringify(result)}</p>
        </div>
      </div>

  )
}

export default Home