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
var CommentBox = React.createClass({
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
 //			setInterval(this.loadCommentsFromServer, this.props.pollInterval);
		},
		render: function() {
				return (
								<div className="commentBox">
								<h1>Comments</h1>
								<CommentList data={this.state.data} />
								<CommentForm 
								onCommentSubmit={this.handleCommentSubmit}	
								/>
								</div>
							 );
		}
});

// tutorial2.js
var CommentList = React.createClass({
		render: function() {
				  var commentNodes = this.props.data.map(function (comment, index) {
							      return <Comment key={index} author={comment.author}>{comment.text}</Comment>;
										    });

				return (
						<div className="commentList">
						{commentNodes}
						</div>
						);
		}
});

var CommentForm = React.createClass({
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
						<form className="commentForm" onSubmit={this.handleSubmit}>
						<input type="text" placeholder="Your name" ref="author" />
						<input
						type="text"
						placeholder="Say something..."
						ref="text"
						/>
						<input type="submit" value="Post" />
						</form>
						);
		}
});


var converter = new Showdown.converter();

// tutorial5.js
var Comment = React.createClass({
		render: function() {
				var rawMarkup = converter.makeHtml(this.props.children.toString());
				return (
						<div className="comment">
						<h2 className="commentAuthor">
						{this.props.author}
						</h2>
						<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
						</div>
						);
		}
});


// <Comment author="Pete Hunt">This is one comment</Comment>
// was original
React.renderComponent(
				<CommentBox url="comments.json" />,
				document.getElementById('content')
				);

