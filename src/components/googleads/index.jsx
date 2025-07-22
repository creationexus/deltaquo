import React from 'react';

export default class AdComponent extends React.Component {
  componentDidMount () {
    (adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
        <ins className='adsbygoogle'
          style={{ display: 'block' }}
          data-ad-client='ca-pub-3682427172881464'
          data-ad-slot='6510124681'
          data-ad-format='auto'
          data-full-width-responsive="false" />
    );
  }
}