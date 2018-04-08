$(document).ready(function () {
    var $NewTaskInput = $('#new-task-input');

    // <a href="#" class="tasklist-item tasklist-red tasklist-completed">
    //      <i class="ion-checkmark"></i>
    //      <h5>Prepare a Design</h5>
    // </a>                    

    $("#add-new-task").on("click",function(){
        var NewTask = '<li>'+$NewTaskInput.val()+'</li>';

        $('#tasks-section').prepend( NewTask );

        $NewTaskInput.val('');
    });
});