function randomWords() {
    fetch('https://data.taipei/api/v1/dataset/f18de02f-b6c9-47c0-8cda-50efad621c14?scope=resourceAquire')
        .then(res => res.json())
        .then(data => {
            const words = data.result.results;
            let word = words[Math.floor(Math.random() * words.length)].F_Name_En;
            $('h1').text(word);
        })

}

randomWords();