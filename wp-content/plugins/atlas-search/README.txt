=== Atlas Search ===
Tags: search
Tested up to: 5.9
Requires PHP: 7.2
Stable tag: 0.1.23
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Author: WP Engine
Contributors: wpengine toughcrab24 konrad-glowacki ciaranshan1 dimitrios-wpengine ericosullivanwp RBrady98 richard-wpengine mindctrl

A WordPress plugin to enhance the default WordPress search features for wp-graphql, and REST search methods.

== Description ==

Atlas Search is an enhanced search solution for WordPress. WordPress default search struggles to surface relevant content
from searches, this plugin enables WordPress to query vastly more relevant and refined content. The plugin enables a 
variety of configuration options and is compatible with builtins and a variety of popular plugins such as, Custom Post Type UI,
Advanced Custom Fields (ACF) and Atlas Content Modeler (ACM).


== Installation ==

This plugin can be installed directly from your WordPress site.

* Log in to your WordPress site and navigate to **Plugins &rarr; Add New**.
* Type "Atlas Search" into the Search box.
* Locate the Atlas Search plugin in the list of search results and click **Install Now**.
* Once installed, click the Activate button.

It can also be installed manually using a zip file.

* Download the Atlas Search plugin from WordPress.org.
* Log in to your WordPress site and navigate to **Plugins &rarr; Add New**.
* Click the **Upload Plugin** button.
* Click the **Choose File** button, select the zip file you downloaded in step 1, then click the **Install Now** button.
* Click the **Activate Plugin** button.

Configuring the Plugin once activated

* Navigate to the Atlas Search settings page in WP Admin
* Enter your URL and Access Token on the Atlas Search settings page
* Click save


== Changelog ==

= 0.1.23 =
* **Fixed** Posts with empty `post_name` with not be synchronized

= 0.1.22 = 
* **Fixed:** Simple Feature Request plugin breaking Atlas search sync

= 0.1.21 =

* **Fixed:** Auto drafts will no longer be automatically synchronized
* **Fixed:** User delete events are now correctly handled
* **Fixed:** Tag descriptions can now be synchronized as longtext

= 0.1.20 =
* **Updated:** Version headers

= 0.1.19 =
* **Updated:** Version headers

= 0.1.18 =
* **Fixed:** Admin error notices correctly instruct users to sync when data sync issues occur

= 0.1.17 =
* **Fixed:** ACF group names search config where they were unable to be searched
* **Fixed:** Fuzzy queries unable to search where numbers are involved


= 0.1.16 =
* **Added:** Fuzzy configration UI

= 0.1.15 =
* **Added:** Enable fuzzy search by default

= 0.1.14 =
* **Added:** Support for ACM's email field

= 0.1.13 =
* **Fixed:** Breaking pagination in WP Admin views
* **Added:** Clear sync progress & locks when plugin is deactivated

= 0.1.12 =
* **Added:** Add button to delete search data
* **Fixed:** Sync button progress bar improvement

= 0.1.11 =
* **Fixed:** Sync button progress is reset when multiple tabs try to sync

= 0.1.10 =
* **Fixed:** Progress bar animation
* **Fixed:** Sync items correctly syncing

= 0.1.9 =
* **Added:** Sync lock to prevent more than one sync executing at a time
* **Fixed:** Progress calculation on sync progress bar
* **Fixed:** Sync can now progress when ACM is not installed

= 0.1.8 =
* **Added:** New sync button to sync content via plugin
* **Added:** Plugin Icon and Banner
* **Added:** Toast confirmations when saving settings
* **Fixed:** Importing posts via ACM
* **Fixed:** Styling issues on Atlas Search Settings

= 0.1.7 =
* Added toast confirmations on settings changes
* Show info to user about syncing data when plugin is activated
* Settings based scripts are now cached by the browser on WP Admin
* Search configuration regenerated on content changes
* Added validation to settings form

= 0.1.6 =
* Search fields now correctly search through content models
* Remove slug as an option from search config
* Url setting will correctly default to an empty string

= 0.1.5 =
* Added new settings page
* Added Search Config page

= 0.1.4 =
* Update WP CLI command prefix to `wp as`

= 0.1.1 =
* Prepare for release

= 0.1.0 =
* Add support for ACM repeater fields
* Improve error messages in wp-admin
* Sync CPT excerpt field 

