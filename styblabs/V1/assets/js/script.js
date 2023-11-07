function toast(msg, error = false) {
  if (error) toastr.error(msg);
  else toastr.info(msg);
}

function progress(load = true) {
  if (load) {
    $("#progress").show();
    $("main").addClass("disable-div");
  } else {
    $("#progress").hide();
    $("main").removeClass("disable-div");
  }
}

$(document)
  .bind("ajaxSend", () => {
    progress();
  })
  .bind("ajaxComplete", () => {
    progress(false);
  });

function ajax(url, data = {}, func = (data) => {}, errFunc = () => {}) {
  $.ajax({
    type: "POST",
    url: url,
    data: data,
    dataType: "json",
    success: (res) => {
      console.log(res);
      if (res.ok === true) func(res.data);
      else {
        toast(res.err, true);
        errFunc();
      }
    },
    cache: false,
    contentType: false,
    processData: false,
    error: (qXHR, textStatus, error) => {
      console.log(error);
      toast(textStatus, true);
      errFunc();
    },
  });
}
function ajax1(url, data = {}, func = (data) => {}, errFunc = () => {}) {
  $.ajax({
    type: "POST",
    url: url,
    data: data,
    dataType: "json",
    success: (res) => {
      console.log(res);
      if (res.ok === true) func(res.data);
      else {
        toast(res.err, true);
        errFunc();
      }
    },
    error: (qXHR, textStatus, error) => {
      console.log(error);
      toast(textStatus, true);
      errFunc();
    },
  });
}
$(document).ready(function () {
  try {
    var pathname = window.location.pathname.split("/byts")[1];
    var pathname = "/byts/" + pathname.split("/")[1] + "/";
    $("li > a").each(function () {
      if ($(this).attr("href") == pathname) {
        $(this).parent().addClass("active");
        $(this).parent().parent().parent().parent().addClass("active");
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass("active");
      }
    });
  } catch (e) {}
});

function editForm(formId) {
  $(".modal").modal("hide");
  $("#krea_datatables_edit_" + formId).modal("show");
}

function Form1() {
  $("form").on("submit", function (e) {
    e.preventDefault();
    // console.log($(this));
    var dataString = new FormData($(this)[0]);
    // console.log(dataString);
    ajax("../../api/v1/data/" + CURL, dataString, function (data) {
      toast(data);
      window.location.reload(1);
    });
    // $('.modal').modal('hide');
  });
}

function confirm(title, callback, ok = "Yes", cancel = "No") {
  $('.modal').modal('hide');
  $("#confirmModalLabel").html(title);
  $("#confirmModalSaveButton").html(ok);
  $("#confirmModalCloseButton").html(cancel);
  $("#confirmModalSaveButton")
    .unbind()
    .click(function () {
      callback();
      $("#confirmModal").modal("hide");
    });
  $("#confirmModal").modal("show");
}

function gridDelete(formId, uId) {
  confirm("Are you sure you want to delete this record?", function () {
    var dataString = new FormData();
    dataString.append("fType", "DELETE");
    dataString.append("form_id", formId);
    dataString.append("update_id", uId);

    ajax("../../api/v1/data/" + CURL, dataString, function (data) {
      toast(data);
      window.location.reload(1);
    });
  });
}
