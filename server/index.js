'use strict';

/**
 * @author Copyright RIKSOF (Private) Limited.
 */
const env = process.env;
const Promise = require( 'bluebird' );
const PushNotification = require('./PushNotification');

/**
 * This function is the entry point for serverless function.
 *
 * @param {any} data                          Data passed to this function.
 * @param {any} context                       Client context. Unused.
 * @param {function} callback                 Callback function to pass back
 *                                            the response.
 *
 * @returns {undefined} None.
 */
module.exports.handler = function SendPushNotificationHandler( data, context, callback ) {
  let pushNotification = new PushNotification( env.serverKey ? env.serverKey : data.env.serverKey );

  let p = [];
  if ( Array.isArray( data.current ) ) {

    // If current is an array
    for ( let i = 0; i < data.current.length; i++ ) {

      if ( Array.isArray( data.current[ i ].to ) ) {
        // If deviceId from current is an array
        for ( let j = 0; j < data.current[ i ].to.length; j++ ) {

          let message = {};
          Object.assign( message, data.current[ i ] );
          message.to = data.current[ i ].to[ j ];

          p[ j ] = pushNotification.send( message );
        }
      } else {

        // If deviceId is an object or string
        p[ i ] = pushNotification.send( data.current[ i ] );

      }
      p = Promise.all( p );
    }
  } else {

    // If current is not an array
    if ( Array.isArray( data.current.to ) ) {

      // If deviceId from current is an array
      for ( let j = 0; j < data.current.to.length; j++ ) {

        let message = {};
        Object.assign( message, data.current );
        message.to = data.current.to[ j ];

        p[ j ] = pushNotification.send( message );
      }
      p = Promise.all( p );
    } else {

      // If deviceId from current is not an array
      p = pushNotification.send( data.current );
    }
  }

  return p.then( function AfterPushNotificationSent( result ) {
    callback( null, result );
  }).catch( function OnError( error ) {
    callback( error, null );
  });
}
