console.log('hello world')

const modalBtns = [...document.getElementsByClassName('modal-button')]
// console.log(modalBtns)
const modalBody = document.getElementById('moral-body-confirm')

const startBtn = document.getElementById('start-button')

const url = window.location.href

modalBtns.forEach(modalBtn => modalBtn.addEventListener('click', () => {
    // console.log(modalBtn)
    const pk = modalBtn.getAttribute('data-pk')
    const name = modalBtn.getAttribute('data-quiz')
    const numQuestions = modalBtn.getAttribute('data-questions')
    const difficulty = modalBtn.getAttribute('data-difficulty')
    const scoreToPass = modalBtn.getAttribute('data-pass')
    const time = modalBtn.getAttribute('data-time')

    modalBody.innerHTML = `
        <div class="h5 mb-3"> Are you sure you want to begin "<b>${name}</b>"
        <div class="text-muted">
            <ul>
                <li> difficulty : <b>${difficulty}</b></li>
                <li> number of questions : <b>${numQuestions}</b></li>
                <li> score to pass : <b>${scoreToPass}%</b></li>
                <li> time : <b>${time} min</b></li>
            </ul>
        </div>
    `

    startBtn.addEventListener('click', () => {
        window.location.href = url + pk
    })

}))