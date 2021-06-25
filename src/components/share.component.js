import React, { Component } from "react";
import { Passers } from "prop-passer";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,

  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  PinterestIcon,
  VKIcon,
} from "react-share";
import SubShareCSS from "./CSS";


class SubShare extends Component {

  render() {

    const {
      url = String(window.location),
      title = "The Daily Dose",
      shareImage = "https://www.steadylearner.com/static/images/brand/prop-passer.png",
      size = "2.0rem",
    } = this.props;

    const ShareList = Passers({
      url,
      className: "network__share-button",
    })({
      className: "network cursor-pointer hover transition--default",
      title: `Share ${String(window.location)}`,
    })("li");

    return (
        <ShareList>
          <FacebookShareButton
            quote={title}
          >
            <FacebookIcon
              size={size}
            />
          </FacebookShareButton>

          <TwitterShareButton
            title={title}
          >
            <TwitterIcon
              size={size}
            />
          </TwitterShareButton>

          <LinkedinShareButton
            title={title}
            windowWidth={750}
            windowHeight={600}
          >
            <LinkedinIcon
              size={size}

            />
          </LinkedinShareButton>
        </ShareList>
    );
  }
}

export default SubShare;

