$(document).ready(function() {

  $("#submit").on("click", function (e) {
    e.preventDefault()

    const burgerData = {
      name : $("#name").val().trim()
    }

    $.ajax({
      url: "/api/burgers",
      method: "POST",
      data: burgerData
    }).then(function () {
      location.reload();
    }).catch(
      err => console.log(err)
    );
  });

 
  $(".update-burger").on("click", function () {

    const burgerId = $(this).attr("data-id")
    const ready = $(this).attr("data-ready")

    $.ajax({
        url: `/api/burgers/${burgerId}`,
        method: "PUT",
        data: {
          ready: ready
        }
      })
      .then(() => location.reload())
      .catch(err => console.log(err));
  });
});