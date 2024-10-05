<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'svetguide' );

/** Database username */
define( 'DB_USER', 'svetguide' );

/** Database password */
define( 'DB_PASSWORD', 'admin@svetguide' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Sv1#+Bhe@m1e/]7:E.GeF8ED_T~i38k$+|Vj)RNEhZC=+qm#bPc<Q2CXL}5 de]2' );
define( 'SECURE_AUTH_KEY',  'z1r eYQCe=hsuFQq(&uG}fU):J4&aI[3RSEQ.EG0}kQp &t&nM!3Ptm1H_?*q:NL' );
define( 'LOGGED_IN_KEY',    '|shT&vZw7c2Eoq>UdZy#g/NuWAq}fuL#EaHOEsZmn*[Nc~>/vgw}%6Wx:,{F <}N' );
define( 'NONCE_KEY',        'ag]R14)_!$,B,X*()V2sN(p//V}<vkK1{z.QA8#/EOlKk$P[<T4:-AV[<K@iKcpi' );
define( 'AUTH_SALT',        '%iolz`c|@Moer6EF|D5vaKR+uooSbxBn<f%r!D}Lwj>Y>f1r,]^u_&4dlx|Y75+$' );
define( 'SECURE_AUTH_SALT', 'df3+v`W7M/oI:eV7D~ClXvV6^6eW Pv(?0<3rCjhP[3*oL-OnATZ{yJ:EX hkQID' );
define( 'LOGGED_IN_SALT',   'J}`znYfKbNqW1;C{Au`+]%;Z&o92]+u<NN.z|)>nj}3DSC%HvK?SmmI1[|hNi*GJ' );
define( 'NONCE_SALT',       ']=@iA@HE08:@3<zA}youf<{_AjiVrwj`6(Yw-w>1=#85VSZ4$nZ|AVeAym_goKoy' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpsv_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
