import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteComment} from '../../actions/postActions';
import { getProfiles } from '../../actions/profileActions';

class CommentItem extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  findHandleProfile(profiles, commentUser) {
    let handle;
    if (profiles != null && profiles.length > 0) {
      profiles.forEach(profile => {
        if (profile.user._id === commentUser) {
          handle = profile.handle;
        }
      });
    }
    return handle;
  }

  onDeleteClick(postId, commentId){
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const {comment, postId, auth} = this.props;

    const { profiles } = this.props.profile;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profile/${this.findHandleProfile(profiles, comment.user)}`}>
              <img className="rounded-circle d-none d-md-block"
                   src={comment.avatar} alt=""/>
            </Link>
            <br/>
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
                <button onClick={this.onDeleteClick.bind(this, postId, comment._id)} type="button"
                        className="btn btn-danger mr-1">
                  <i className="fas fa-times"/>
                </button>
              )
              : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {deleteComment, getProfiles})(CommentItem);
