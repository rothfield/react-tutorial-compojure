/**
 * @jsx React.DOM
 */
// The above declaration must remain intact at the top of the script.
//  Structure of our data

// - CommentBox
//  - CommentList
//	  - Comment
//		  - CommentForm
//	  - Comment



var data = [
{author: "John", text: "was here.This is one comment"},
{author: "Pete Hunt", text: "This is one comment"},
{author: "Jordan Walke", text: "This is *another* comment"}
];
var CommentBox = React.createClass({displayName: 'CommentBox',
		loadCommentsFromServer: function() {
				$.ajax({
						url: this.props.url,
						dataType: 'json',
						success: function(data) {
								this.setState({data: data});
						}.bind(this)
				});
		},
		handleCommentSubmit: function(comment) {
				$.ajax({
						url: this.props.url,
				dataType: 'json',
				type: 'POST',
				data: comment,
				success: function(data) {
						this.setState({data: data});
				}.bind(this)
				});
		},
		getInitialState: function() {
				return {data: []};
		},
		componentWillMount: function() {
				this.loadCommentsFromServer();
				setInterval(this.loadCommentsFromServer, this.props.pollInterval);
		},
		render: function() {
				return (
								React.DOM.div( {className:"commentBox"}, 
								React.DOM.h1(null, "Comments"),
								CommentList( {data:this.state.data} ),
								CommentForm( 
								{onCommentSubmit:this.handleCommentSubmit}	
								)
								)
							 );
		}
});

// tutorial2.js
var CommentList = React.createClass({displayName: 'CommentList',
		render: function() {
				var commentNodes = this.props.data.map(function (comment) {
						return Comment( {author:comment.author}, comment.text);
				});

				return (
						React.DOM.div( {className:"commentList"}, 
						commentNodes
						)
						);
		}
});

var CommentForm = React.createClass({displayName: 'CommentForm',
		handleSubmit: function() {
				var author = this.refs.author.getDOMNode().value.trim();
				var text = this.refs.text.getDOMNode().value.trim();
				if (!text || !author) {
						return false;
				}
				this.props.onCommentSubmit({author: author, text: text});
				// TODO: send request to the server
				this.refs.author.getDOMNode().value = '';
				this.refs.text.getDOMNode().value = '';
				return false;
		},
		render: function() {
				return (
						React.DOM.form( {className:"commentForm", onSubmit:this.handleSubmit}, 
						React.DOM.input( {type:"text", placeholder:"Your name", ref:"author"} ),
						React.DOM.input(
						{type:"text",
						placeholder:"Say something...",
						ref:"text"}
						),
						React.DOM.input( {type:"submit", value:"Post"} )
						)
						);
		}
});


var converter = new Showdown.converter();

// tutorial5.js
var Comment = React.createClass({displayName: 'Comment',
		render: function() {
				var rawMarkup = converter.makeHtml(this.props.children.toString());
				return (
						React.DOM.div( {className:"comment"}, 
						React.DOM.h2( {className:"commentAuthor"}, 
						this.props.author
						),
						React.DOM.span( {dangerouslySetInnerHTML:{__html: rawMarkup}} )
						)
						);
		}
});


// <Comment author="Pete Hunt">This is one comment</Comment>
// was original
React.renderComponent(
				CommentBox( {url:"comments.json"} ),
				document.getElementById('content')
				);

