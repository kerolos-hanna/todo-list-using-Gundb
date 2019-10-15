var todos = Gun().get('todos')

    $('form').on('submit', function (event) {
      var input = $('form').find('input')
      todos.set({ title: input.val() })
      input.val('')
      event.preventDefault()
    })

    todos.map().on(function (todo, id) {
      var li = $('#' + id)
      if (!li.get(0)) {
        li = $('<li>').attr('id', id).appendTo('ul')
      }
      
      if (todo) {
        var html = '<span onclick="clickTitle(this)">' + todo.title + '</span>'
        html = '<input type="checkbox" onclick="clickCheck(this)" ' + (todo.done ? 'checked' : '') + '>' + html

        html += '<img onclick="clickDelete(this)" src="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-x.svg"/>'
        li.html(html)
      
      } else {
        li.remove()
      }
    })
    
    function clickTitle(element) {
      element = $(element)
      if (!element.find('input').get(0)) {
        element.html('<input value="' + element.html() + '" onkeyup="keypressTitle(this)">')
      }
    }

    function keypressTitle(element) {
      if (event.keyCode === 13) {
        todos.get($(element).parent().parent().attr('id')).put({ title: $(element).val() })
      }
    }

    function clickCheck(element) {
      todos.get($(element).parent().attr('id')).put({ done: $(element).prop('checked') })
    }

    function clickDelete(element) {
      todos.get($(element).parent().attr('id')).put(null)
    }
