class Note{
    constructor(title, note, writeDate){
        this.title = title;
        this.note = note;
        this.writeDate = writeDate;
        this.updated = false;
    }

}

function addNote(title, note, writeDate){
    return new Note(title, note, writeDate);
}

function showNotes(notesArray, htmlComponent){
    if(notesArray.length > 0){
        htmlComponent.innerHTML += `
        <div id="note-boy">
        </div>
        `;

        const noteBoy = document.querySelector("#note-boy");
        notesArray.forEach((elem,index) => {
            noteBoy.innerHTML += `
            <div class="note-pad" id=${index}>
                <div class="note-title">
                ${elem.title}
                </div>
                <div class="note-notes">
                ${elem.note}
                </div>
                <div id="noteEdits">
                    <div id="deleter"></div>
                    <div id="editer"></div>
                </div>
                <div class="date">
                ${elem.updated? "updated":"written"} on: ${elem.writeDate}
                </div>
            </div>
            `;
        });
    } else {
        htmlComponent.innerHTML += `
        <div id="empty-message">
            No notes here! Click note task in the top right corner to add one.
        </div> `;
    }
}

function getNoteFormData(){
    const title = document.querySelector("#note-title-input").value;
    const note = document.querySelector("#note-description-input").value;
    const dateFormatter = new Date();
    const writeDate = dateFormatter.getMonth() +"/"+ dateFormatter.getDate() +"/"+ String(dateFormatter.getFullYear()).split("")[2] + String(dateFormatter.getFullYear()).split("")[3]
    console.log(title, note, writeDate);
    
   
    return {
        title,
        note,
        writeDate
    }

}

export {addNote, showNotes, getNoteFormData}