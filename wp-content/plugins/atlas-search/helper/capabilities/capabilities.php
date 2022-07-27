<?php

namespace Wpe_Content_Engine\Helper\Capabilities;

use \Exception as Exception;
use \ErrorException as ErrorException;
use Wpe_Content_Engine\Helper\Constants\Capabilities as Capabilities_Const;
use Wpe_Content_Engine\Helper\Client_Interface;
use Wpe_Content_Engine\Helper\Logging\Debug_Logger;
use Wpe_Content_Engine\Settings_Interface;
use Wpe_Content_Engine\WPSettings;

/**
 * @package    Wpe_Content_Engine
 * @subpackage Wpe_Content_Engine/public
 */
class Capabilities {

	private const WPE_CONTENT_ENGINE_CAPABILITIES    = 'wpe_content_engine_capabilities';
	private const DEFAULT_EXPIRATION_TIME_IN_SECONDS = 60; // 1 min
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
	 * @param bool $use_cache Use cache.
	 * @return array
	 */
	public function get_capabilities( bool $use_cache = true ): array {
		if ( $use_cache ) {
			$cached_result = get_transient( self::WPE_CONTENT_ENGINE_CAPABILITIES );
			if ( false !== $cached_result ) {
				return $cached_result;
			}
		}

		try {
			$call_result = $this->fetch();
			if ( ! is_array( $call_result ) || ! isset( $call_result['data']['capabilities'] ) ) {
				( new Debug_Logger() )->log( "Error retrieving capabilities. Api call not an array or does not contain 'data' or 'capabilities' elements. Returning defaults. Result: {$call_result}" );
				$result = $this->get_defaults();
			} else {
				$result = $call_result['data']['capabilities'];
			}

			if ( $use_cache ) {
				set_transient( self::WPE_CONTENT_ENGINE_CAPABILITIES, $result, self::DEFAULT_EXPIRATION_TIME_IN_SECONDS );
			}
		} catch ( Exception $e ) {
			( new Debug_Logger() )->log( "Error fetching capabilities, returning defaults. Message: {$e->getMessage()}" );
			$result = $this->get_defaults();
		}

		return $result;
	}

	/**
	 * @param bool $use_cache Use Cache.
	 * @return bool
	 */
	public function is_search_enabled( bool $use_cache = true ): bool {

		return $this->is_capability_enabled( Capabilities_Const::ELASTICSEARCH, $use_cache );
	}

	/**
	 * @param bool $use_cache Use Cache.
	 * @return bool
	 */
	public function is_static_site_rebuild_enabled( bool $use_cache = true ): bool {

		return $this->is_capability_enabled( Capabilities_Const::STATIC_SITE_REBUILD, $use_cache );
	}

	/**
	 * @param string $capability Specify capability.
	 * @param bool   $use_cache Use cache or not.
	 *
	 * @return bool
	 */
	private function is_capability_enabled( string $capability, bool $use_cache = true ): bool {
		$capabilities = $this->get_capabilities( $use_cache );

		return in_array( $capability, $capabilities );
	}

	/**
	 * @return array
	 *
	 * @throws ErrorException Thrown if there is no endpoint specified or there's a comms issue with the endpoint.
	 */
	private function fetch(): array {
		$query = <<<'GRAPHQL'
			query CapabilitiesQuery
			{
				capabilities
			}
			GRAPHQL;

		$wpe_content_engine_options = $this->settings->get( WPSettings::WPE_CONTENT_ENGINE_OPTION_NAME ); // Array of All Options.
		$end_point                  = $wpe_content_engine_options['url'] ?? '';
		if ( ! $end_point || trim( $end_point ) === '' ) {
			throw new ErrorException( 'No endpoint found to query capabilities.' );
		}

		return $this->client->query( $end_point, $query, array(), $wpe_content_engine_options['access_token'] ?? '' );
	}

	/**
	 * @return array An array of default capabilities supported by the plugin.
	 */
	public function get_defaults(): array {
		return array();
	}
}
