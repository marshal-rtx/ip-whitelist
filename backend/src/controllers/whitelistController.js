import { Whitelist } from '../models/Whitelist.js';

export const addToWhitelist = async (req, res) => {
  try {
    const { ipv4, ipv6 } = req.body;
    const { discordId, username } = req.user;

    const whitelist = new Whitelist({
      discordId,
      username,
      ipv4,
      ipv6
    });

    await whitelist.save();

    res.status(201).json({
      message: 'Successfully whitelisted',
      data: whitelist
    });
  } catch (error) {
    console.error('Whitelist error:', error);
    res.status(500).json({ error: 'Failed to whitelist IP' });
  }
};

export const updateWhitelist = async (req, res) => {
  try {
    const { ipv4, ipv6 } = req.body;
    const { discordId } = req.user;

    const whitelist = await Whitelist.findOneAndUpdate(
      { discordId },
      { 
        ipv4, 
        ipv6,
        lastUpdated: Date.now()
      },
      { new: true }
    );

    if (!whitelist) {
      return res.status(404).json({ error: 'Whitelist entry not found' });
    }

    res.json({
      message: 'Successfully updated whitelist',
      data: whitelist
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update whitelist' });
  }
};

export const getWhitelistStatus = async (req, res) => {
  try {
    const { discordId } = req.user;
    const whitelist = await Whitelist.findOne({ discordId });

    if (!whitelist) {
      return res.status(404).json({ error: 'Not whitelisted' });
    }

    res.json({ data: whitelist });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Failed to check whitelist status' });
  }
};