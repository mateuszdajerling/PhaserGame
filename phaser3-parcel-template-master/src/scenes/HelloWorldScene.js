import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene
{
    	constructor()
	{
		super('game-scene')

		this.player = undefined
		this.cursors = undefined
        this.monument = undefined
        this.scoreText = undefined
        this.sky = undefined
        
	}

	
	preload()
    {

        this.load.image('sky', 'assets/sky.png')
		this.load.image('ground', 'assets/platform.png')
		this.load.image('star', 'assets/star.png')
		this.load.image('bomb', 'assets/bomb.png')
        this.load.image('monument', 'assets/monument.png')
        this.load.image('black', 'assets/black.png')
		this.load.spritesheet('dude', 
			'assets/dude.png',
			{ frameWidth: 32, frameHeight: 48 }
		)
    }
        
    create()
    {
        this.sky =  this.add.image(990, 540, 'sky').setScale(3)
        const platforms =   this.createPlatforms()
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })
        this.player = this.createPlayer()
        this.monument = this.createMonument()
        this.physics.add.collider(this.player, platforms)
        this.physics.add.collider(this.monument,platforms)
        this.physics.add.overlap(this.player,this.monument,this.mounmentActivate,null,this)
        this.cursors = this.input.keyboard.createCursorKeys()
    }
    
    update(){
        
        
        if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-120)

			this.player.anims.play('left', true)
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(120)

			this.player.anims.play('right', true)
		}
		else
		{
			this.player.setVelocityX(0)

			this.player.anims.play('turn')
		}

		if (this.cursors.up.isDown && this.player.body.touching.down)
		{
			this.player.setVelocityY(-300)
		}
    }
    
    
    createPlatforms(){
    
        const platforms = this.physics.add.staticGroup()
    
//      platforms.create(40, 1900, 'ground').refreshBody()
//		platforms.create(600, 400, 'ground')
//		platforms.create(50, 250, 'ground')
//		platforms.create(750, 220, 'ground')
        platforms.create(300,700,  'ground').setScale(1).refreshBody()
        platforms.create(700,700,  'ground').setScale(1).refreshBody()
        return platforms
    
    }
    
    createMonument(){
        
        const monument = this.physics.add.image(190,200,'monument')
        
        return monument
        
    }
    
    mounmentActivate(){
        
        this.scoreText.setText('Monumnet aktywowany! ')
        this.load.once(Phaser.Loader.Events.COMPLETE, () => {
		  this.sky.setTexture('black')
	})
        this.load.start()
        console.log("changed!")
    }
    
    
    createPlayer()
	{
        const player = this.physics.add.sprite(100, 300, 'dude')
		player.setBounce(0.2)
		player.setCollideWorldBounds(true)

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		})
		
		this.anims.create({
			key: 'turn',
			frames: [ { key: 'dude', frame: 4 } ],
			frameRate: 20
		})
		
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		})
        
        return player
	}
}