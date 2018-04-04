$(document).ready(function () {
    var $NewTaskInput = $('#new-task-input');
    var $tasksSection = $('#tasks-section');

    // <a href="#" class="tasklist-item tasklist-red tasklist-completed">
    //      <i class="ion-checkmark"></i>
    //      <h5>Prepare a Design</h5>
    // </a>                    

    $('add-new-task').on('click', function() {
        var NewTask = '<a href="#" class="tasklist-item tasklist-red tasklist-completed"><i class="ion-checkmark"></i><h5>'+$NewTaksInput.val()+'</h5></a>';

        $('#tasks-section').append( NewTask );

        $NewTastInput.val('');
    });
});