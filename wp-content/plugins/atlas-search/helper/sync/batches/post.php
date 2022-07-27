<?php

namespace Wpe_Content_Engine\Helper\Sync\Batches;

use ErrorException;
use WP_CLI;
use WP_Query;
use WP_Post;
use Wpe_Content_Engine;
use Wpe_Content_Engine\Core_Wp_Wrapper\Wp_Progress_Bar;
use Wpe_Content_Engine\Helper\Constants\Post_Status;
use Wpe_Content_Engine\Helper\Constants\Post_Type;
use Wpe_Content_Engine\Helper\Progress_Bar_Info_Trait;
use Wpe_Content_Engine\Helper\Sync\Entity\Wordpress\Post as Post_Entity;

class Post implements Batch_Sync_Interface {

	use Progress_Bar_Info_Trait;

	/**
	 * @var Post_Entity
	 */
	private Post_Entity $sync_post;

	public function __construct( Post_Entity $sync_post ) {
		$this->sync_post = $sync_post;
	}

	/**
	 * @param int $offset Offset.
	 * @param int $number Number.
	 * @return WP_Post[]
	 */
	public function get_items( $offset, $number ): array {
		$q   = array(
			'post_type'           => array( Post_Type::POST ),
			'post_status'         => Post_Status::PUBLISH,
			'posts_per_page'      => $number,
			'paged'               => $offset,
			'ignore_sticky_posts' => true,
		);
		$qry = new WP_Query( $q );

		return $qry->posts;
	}

	/**
	 * @param WP_Post[] $posts Posts.
	 *
	 * @throws ErrorException Exception.
	 */
	public function sync( $posts ) {
		if ( count( $posts ) <= 0 ) {
			return;
		}
		foreach ( $posts as $post ) {
			$this->sync_post->upsert( $post->ID, $post );
			$this->tick();

		}
		$this->finish();
	}

	/**
	 * @param mixed $items Items.
	 * @param int   $page Page.
	 */
	public function format_items( $items, $page ) {
		$o = array_column( $items, 'ID' );
		WP_CLI::log( WP_CLI::colorize( "%RSyncing WordPress Posts - Page:{$page} Ids:" . implode( ',', $o ) . '%n ' ) );
	}

	/**
	 * @return int
	 */
	public function get_total_items(): int {
		return wp_count_posts( Post_Type::POST )->publish;
	}
}
