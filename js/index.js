data = () => {
    console.log("äbc");
    return {
        qtns: [
           {
               qtn: "This is first question to be answered ?",
               type: "image",
               min_selection: 3,
               selection_text: "Pick up to 3 designs that you like",
               options: [{a:"./images/op1.jpg"}, {b:"./images/op2.jpg"},{c:"./images/op3.jpg"}, {d:"./images/op4.jpg"}]
           },
           {
               qtn:"The second question is illogical checkbox to you?",
               type: "image",
               min_selection:1, 
               selection_text: "Select one to pick",
               options: [{a:"./images/op3.jpg"}, {b:"./images/op4.jpg"}]
           },
           {
               qtn:"The third question is different for you?",
               type: "checkbox",
               min_selection:2,
               selection_text: "Pick up to 3 designs that you like",
               options: [{a:"apple"}, {b:"boy"}, {c:"cat"}]
           },
           {
               qtn:"The fourth question is back to you?",
               type: "image",
               min_selection:1,
               selection_text: "Select one to pick",
               options: [{a:"./images/op5.jpg"}, {b:"./images/op6.jpg"}]
           }
        ],
        q_pos: 0,
        len:0,
        answers: [],
        progress_per:0,
        temp_answer:{},
        init() {
            this.len = this.qtns.length;
            this.answers = new Array(this.len);
        },   
        incr() {
            if(!this.answer_storage(this.q_pos)){
                alert("check the selection condition");
                return false;
            }
            if(this.q_pos < this.len-1)
                this.q_pos++;
            
            this.restore_prev_ans(this.q_pos);
            this.load_progress(this.q_pos,this.len);

        },
        decr() {
            let init_pos = 0;
            if(this.q_pos > init_pos)
                this.q_pos--;
            this.restore_prev_ans(this.q_pos);
            this.load_progress(this.q_pos,this.len);
        },
        load_progress(pos) {
            let prog_obj = document.getElementById("progress-bar");
            prog_obj.style.removeProperty("animation");
            this.progress_per = this.progress_cal(pos,this.len);
            prog_obj.style.maxWidth  = this.progress_per+"%";
            setTimeout(function(){
                prog_obj.style.animation  = "progress 1.5s ease-in-out forwards";
            },5);
        },
        progress_cal(val,size) {
            return (val/size)*100;
        },
        capture_answer(ans_key,pos) {

            let selection = this.qtns[this.q_pos].min_selection;

            // if( t_ans_len && this.temp_answer.includes(ans_key))
            //     return;
            if(this.temp_answer.hasOwnProperty(pos)){
                delete this.temp_answer[pos];
                return;
            }

            // delete person.age
            //info: below code to differentate single or multiple ans selection.
            if(selection == 1) { //single
                this.temp_answer = {};
                this.temp_answer[pos] = ans_key;
            } else if(selection > 1){ //multiple
                this.temp_answer[pos] = ans_key;
            }
            
        },
        answer_storage(pos) {
            let t_ans_len = Object.keys(this.temp_answer).length;
            if(t_ans_len < this.qtns[this.q_pos].min_selection)
                return false;
            this.answers[pos] = this.temp_answer;
            this.temp_answer = {};
            return true;
        },
        restore_prev_ans(pos) {
            if(this.answers[pos])
                this.temp_answer = this.answers[pos];
        }
    }
}

// With JQuery
$("#ex13").slider({
    ticks: [0, 100, 200, 300, 400],
    ticks_labels: ['$0', '$100', '$200', '$300', '$400'],
    ticks_snap_bounds: 30
});

// Without JQuery
var slider = new Slider("#ex13", {
    ticks: [0, 100, 200, 300, 400],
    ticks_labels: ['$0', '$100', '$200', '$300', '$400'],
    ticks_snap_bounds: 30
});