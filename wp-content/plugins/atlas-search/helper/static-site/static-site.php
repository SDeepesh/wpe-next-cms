<?php

namespace Wpe_Content_Engine\Helper\Capabilities;

use ErrorException;
use Wpe_Content_Engine\Helper\Client_Interface;
use Wpe_Content_Engine\Settings_Interface;
use Wpe_Content_Engine\WPSettings;

/**
 * @package    Wpe_Content_Engine
 * @subpackage Wpe_Content_Engine/public
 */
class Static_Site {

	/**
	 * The client of this plugin.
	 *
	 * @access   private
	 * @var      Client_Interface $client
	 */
	private Client_Interface $client;

	/**
	 * The client of this plugin.
	 *
	 * @access   private
	 * @var      Settings_Interface $settings
	 */
	private Settings_Interface $settings;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @param Client_Interface   $client Client.
	 * @param Settings_Interface $settings Settings.
	 */
	public function __construct( Client_Interface $client, Settings_Interface $settings ) {
		$this->client   = $client;
		$this->settings = $settings;
	}

	/**
	 * @returns array Result.
	 * @throws ErrorException If there are errors in the call.
	 */
	public function rebuild(): array {
		$query = <<<'GRAPHQL'
        mutation rebuildHeadlessApp {
          rebuildHeadlessApp {
                status
                message
          }
        }
        GRAPHQL;

		$wpe_content_engine_options = $this->settings->get( WPSettings::WPE_CONTENT_ENGINE_OPTION_NAME ); // Array of All Options.

		return $this->client->query(
			$wpe_content_engine_options['url'],
			$query,
			array(),
			$wpe_content_engine_options['access_token']
		);
	}

}
